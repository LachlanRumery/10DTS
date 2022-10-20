import csv
from dataclasses import dataclass


@dataclass
class YearData:
	Total: int
	Male: int
	Female: int
	Unknown: int
	Adult: int
	Juvenile: int
	Monthly_Data: dict


@dataclass
class MonthData:
	Total: int
	Male: int
	Female: int
	Unknown: int
	Adult: int
	Juvenile: int


@dataclass
class CrimeData:
	Yearly_Data: dict
	Total: int
	Male: int
	Female: int
	Unknown: int
	Adult: int
	Juvenile: int
	Index: int


class CSVHandler:
	def __init__(self, filename) -> None:
		"""
        Slay

        :param filename:
        """
		self.filename = filename

	def open(self) -> dict:
		"""

        :return:
        """
		with open(self.filename, 'r') as file:
			csvreader = csv.reader(file)

			headers = next(csvreader)

			rows = []
			for row in csvreader:
				rows.append(row)

			return {'headers': headers, 'rows': rows}

	@property
	def process(self) -> dict:
		"""
        Processes CSV data
        :return:
        """
		crimes = {}

		file_data = self.open()

		valid_crimes = file_data['headers'][3:]

		index = 3
		for crime in valid_crimes:
			monthly_data = {}

			month = 0
			month_index = 0
			total = 0
			year = 2001

			cache = {'Month': 'Jan-01', 'Total': 0, 'Male': 0, 'Female': 0, 'Not Stated': 0, 'Adult': 0, 'Juvenile': 0}
			groups = {'Adult': 0, 'Juvenile': 0, 'Female': 0, 'Male': 0, 'Not Stated': 0}

			yearly = {}
			for row in file_data['rows']:
				# Monthly data handler
				if month_index == 6:
					month_index = 0
					month += 1

					monthly_data[cache['Month'][0:3]] = MonthData(cache['Total'], cache['Male'], cache['Female'],
																  cache['Not Stated'], cache['Adult'],
																  cache['Juvenile'])

					cache = {'Month': row[0], 'Total': 0, 'Male': 0, 'Female': 0, 'Not Stated': 0,
							 'Adult': 0, 'Juvenile': 0}

				if month == 12:
					month = 0
					yearly[str(year)] = monthly_data
					monthly_data = {}
					year += 1

				num = row[index]
				num = int(num)
				total += num
				cache['Total'] += num

				# 1 -> Age, 2 -> Gender
				groups[row[1]] += num
				groups[row[2]] += num

				cache[row[1]] += num
				cache[row[2]] += num

				month_index += 1

			crimes[crime] = CrimeData(yearly, total, groups['Male'], groups['Female'], groups['Not Stated'],
									  groups['Adult'], groups['Juvenile'], index)
			index += 1
		return crimes


class DataHandler:
	def __init__(self, file):
		self.CSVHandler = CSVHandler(file)
		self.crimeData = self.CSVHandler.process

	def month_totals(self, crime, start=2001, end=2021) -> dict:
		"""

		:param crime:
		:param start: Optional
		:param end:
		:return: {'Jan-01': 10, 'Feb-01': 9 ... 'Dec-21': 12}
		"""
		current = start
		totals = {}

		crime_data = self.crimeData[crime]
		yearly_data = crime_data.Yearly_Data

		while current < end + 1:
			for month in yearly_data[str(current)]:
				z = yearly_data[str(current)][month]
				total = z.Total
				totals[f'{month}-{str(current)[2:4]}'] = total
			current += 1
		return totals
