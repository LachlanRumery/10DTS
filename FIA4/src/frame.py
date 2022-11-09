#  MIT License
#
#  Copyright (c) 2022 Lachlan Rumery
#
#  Permission is hereby granted, free of charge, to any person obtaining a copy
#  of this software and associated documentation files (the "Software"), to deal
#  in the Software without restriction, including without limitation the rights
#  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#  copies of the Software, and to permit persons to whom the Software is
#  furnished to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in all
#  copies or substantial portions of the Software.
#
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#  SOFTWARE.

import tkinter as tk

import matplotlib
import matplotlib.ticker as mticker
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure

from data_reader import DataHandler

matplotlib.use('TKAgg')

# Fonts
H1 = ('Monospace', 20)

# Global
global variable
global canvas

# Graph
figure = Figure(figsize=(10, 5), dpi=100)
axis = figure.add_subplot(111)


class QLDCrimeReport(tk.Tk):
	def __init__(self, *args, **kwargs) -> None:
		"""
		Initialises TKinter frame
		"""
		tk.Tk.__init__(self, *args, **kwargs)
		window = tk.Frame(self)

		window.pack(side="top", fill="both", expand=True)

		window.grid_rowconfigure(0, weight=1)
		window.grid_columnconfigure(0, weight=1)

		self.windows = {}

		for W in (LandingPage, GraphPage):
			frame = W(window, self)
			self.windows[W] = frame
			frame.grid(row=0, column=0, sticky='nsew')
		self.display_window(LandingPage)

	def display_window(self, window) -> None:
		"""
        Display window

        :param window: Window to open
        """
		if window == LandingPage:
			graph_control(0)
		window = self.windows[window]
		window.config(bg='white')
		window.tkraise()


class LandingPage(tk.Frame):
	def __init__(self, parent, controller) -> None:
		tk.Frame.__init__(self, parent)
		label = tk.Label(self, text="Queensland Crime Report", font=H1)
		label.config(bg='white')
		label.pack()

		crimes = DataHandler('../resources/Raw.csv').get_crimes()

		global variable
		variable = tk.StringVar(self)
		variable.set(crimes[0])

		drop_down = tk.OptionMenu(self, variable, *crimes)

		button = tk.Button(self, text="Graph",
						   command=lambda: controller.display_window(GraphPage))
		drop_down.pack()
		button.pack()


class GraphPage(tk.Frame):
	def __init__(self, parent, controller) -> None:
		tk.Frame.__init__(self, parent)

		button = tk.Button(self, text='Return', command=lambda: controller.display_window(LandingPage))
		button.pack()

		global canvas
		canvas = FigureCanvasTkAgg(figure, self)


def graph_control(i) -> None:
	print(variable.get())

	crime = variable.get()
	crimeData = DataHandler('../resources/Raw.csv').month_totals(crime)

	axis.plot(crimeData.keys(), crimeData.values(), label=crime)
	figure.suptitle(crime)
	figure.legend()

	axis.xaxis.set_major_locator(mticker.MultipleLocator(12))
	figure.autofmt_xdate()

	canvas.get_tk_widget().pack_forget()
	canvas.get_tk_widget().pack()


App = QLDCrimeReport()

App.title('QLD Crime Statistics')
photo = tk.PhotoImage(file='../resources/logo.png')
App.wm_iconphoto(False, photo)
App.geometry('350x300')

App.mainloop()
