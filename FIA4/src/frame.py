import tkinter as tk

import matplotlib
import matplotlib.ticker as mticker
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg  # , NavigationToolbar2Tk
from matplotlib.figure import Figure

from data_reader import DataHandler

# matplotlib import statements


matplotlib.use('TKAgg')


# Fonts
H1 = ('Monospace', 20)

class QLDCrimeReport(tk.Tk):
    def __init__(self, *args, **kwargs):
        tk.Tk.__init__(self, *args, **kwargs)
        window = tk.Frame(self)

        window.pack(side="top", fill="both", expand=True)

        window.grid_rowconfigure(0, weight=1)
        window.grid_columnconfigure(0, weight=1)

        self.windows = {}

        for W in (LandingPage, MurderPage):
            frame = W(window, self)
            self.windows[W] = frame
            frame.grid(row=0, column=0, sticky='nsew')
        self.display_window(LandingPage)

    def display_window(self, window):
        """

        :param window:
        :return:
        """
        window = self.windows[window]
        window.config(bg='white')
        window.tkraise()


class LandingPage(tk.Frame):
    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        label = tk.Label(self, text="Start Page", font=H1)
        label.pack()

        button = tk.Button(self, text="Vehicles (steal from/enter with intent)",
                           command=lambda: controller.display_window(MurderPage))
        button.pack()


class MurderPage(tk.Frame):
    def __init__(self, parent, controller) -> None:
        tk.Frame.__init__(self, parent)

        button = tk.Button(self, text='Return', command=lambda: controller.display_window(LandingPage))
        button.pack()

        murders = DataHandler('../resources/Raw.csv').month_totals('Vehicles (steal from/enter with intent)')

        f = Figure(figsize=(10, 5), dpi=100)
        f.suptitle('Vehicles (steal from/enter with intent)')
        a = f.add_subplot(111)
        a.plot(murders.keys(), murders.values())
        mylocator = mticker.MultipleLocator(12)
        a.xaxis.set_major_locator(mylocator)

        f.autofmt_xdate()

        canvas = FigureCanvasTkAgg(f, self)
        canvas.get_tk_widget().pack()


App = QLDCrimeReport()

App.title('QLD Crime Statistics')
photo = tk.PhotoImage(file='../logo.png')
App.wm_iconphoto(False, photo)
App.geometry('800x600')

App.mainloop()
