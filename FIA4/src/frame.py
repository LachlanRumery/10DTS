import tkinter as tk

import matplotlib
import matplotlib.ticker as mticker
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure

from data_reader import DataHandler

matplotlib.use('TKAgg')

# Fonts
H1 = ('Monospace', 20)

# Global Variables
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
