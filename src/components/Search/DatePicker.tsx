"use client"

import * as React from "react"
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

export function DatePickerWithRange({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const [selectedRange, setSelectedRange] = React.useState<{ from?: Date, to?: Date }>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	})
	const [open, setOpen] = React.useState(false)
	const [currentMonth, setCurrentMonth] = React.useState(new Date(2022, 0, 1))

	const handleDateClick = (date: Date) => {
		if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
			setSelectedRange({ from: date, to: undefined })
		} else if (selectedRange.from && !selectedRange.to) {
			if (date < selectedRange.from) {
				setSelectedRange({ from: date, to: selectedRange.from })
			} else {
				setSelectedRange({ from: selectedRange.from, to: date })
			}
		}
	}

	const isDateInRange = (date: Date) => {
		if (!selectedRange.from || !selectedRange.to) return false
		return date >= selectedRange.from && date <= selectedRange.to
	}

	const isDateSelected = (date: Date) => {
		return (selectedRange.from && isSameDay(date, selectedRange.from)) ||
			(selectedRange.to && isSameDay(date, selectedRange.to))
	}

	const getDaysInMonth = (date: Date) => {
		const start = startOfMonth(date)
		const end = endOfMonth(date)
		return eachDayOfInterval({ start, end })
	}

	const getCalendarDays = (date: Date) => {
		const days = getDaysInMonth(date)
		const firstDay = startOfMonth(date)
		const startDay = firstDay.getDay()

		const calendarDays = []

		for (let i = 0; i < startDay; i++) {
			calendarDays.push(null)
		}

		days.forEach(day => {
			calendarDays.push(day)
		})

		return calendarDays
	}

	const nextMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
	}

	const prevMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
	}

	const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
	const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

	const formatSelectedDates = () => {
		if (!selectedRange.from) return null
		if (!selectedRange.to) return format(selectedRange.from, "MMM dd, yyyy")

		const nights = Math.ceil((selectedRange.to.getTime() - selectedRange.from.getTime()) / (1000 * 60 * 60 * 24))
		return {
			dateRange: `${format(selectedRange.from, "MMM dd")} - ${format(selectedRange.to, "MMM dd, yyyy")}`,
			nights: `${nights} nights`
		}
	}

	const selectedDates = formatSelectedDates()

	return (
		<div className={`relative ${className}`}>
			<button
				onClick={() => setOpen(!open)}
				className="w-full flex items-center justify-between text-left rounded-xl transition-all duration-200"
			>
				<div className="flex items-center gap-3">
					<CalendarIcon className="h-5 w-5 text-gray-500" />
					<div className="flex flex-col">
						{selectedDates ? (
							<>
								<span className="text-sm font-medium text-gray-900">
									{typeof selectedDates === 'string' ? selectedDates : selectedDates.dateRange}
								</span>
								{typeof selectedDates === 'object' && (
									<span className="text-xs text-gray-500">
										{selectedDates.nights}
									</span>
								)}
							</>
						) : (
							<>
								<span className="text-sm font-medium text-gray-900">Check-in / Check-out</span>
								<span className="text-xs text-gray-500">Add dates</span>
							</>
						)}
					</div>
				</div>
			</button>

			{open && (
				<div className="absolute top-full left-0 mt-2 z-50 bg-white border-0 shadow-2xl rounded-2xl p-6 min-w-[600px]">
					<div className="mb-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-1">Select dates</h3>
						<p className="text-sm text-gray-500">Minimum stay: 1 night</p>
					</div>

					<div className="flex gap-8">
						{/* Current Month */}
						<div className="flex-1">
							<div className="flex items-center justify-between mb-4">
								<button
									onClick={prevMonth}
									className="p-2 hover:bg-gray-100 rounded-full transition-colors"
								>
									<ChevronLeft className="h-4 w-4" />
								</button>
								<h4 className="text-base font-medium text-gray-900">
									{format(currentMonth, "MMMM yyyy")}
								</h4>
								<div className="w-8"></div>
							</div>

							<div className="grid grid-cols-7 gap-1 mb-2">
								{weekDays.map(day => (
									<div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
										{day}
									</div>
								))}
							</div>

							<div className="grid grid-cols-7 gap-1">
								{getCalendarDays(currentMonth).map((day, index) => (
									<div key={index} className="aspect-square">
										{day && (
											<button
												onClick={() => handleDateClick(day)}
												className={`w-full h-full flex items-center justify-center text-sm rounded-full transition-all duration-150 ${isDateSelected(day)
														? 'bg-gray-900 text-white font-medium'
														: isDateInRange(day)
															? 'bg-gray-200 text-gray-900'
															: isToday(day)
																? 'bg-gray-100 text-gray-900 font-medium'
																: 'text-gray-700 hover:bg-gray-100'
													}`}
											>
												{day.getDate()}
											</button>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="flex-1">
							<div className="flex items-center justify-between mb-4">
								<div className="w-8"></div>
								<h4 className="text-base font-medium text-gray-900">
									{format(nextMonthDate, "MMMM yyyy")}
								</h4>
								<button
									onClick={nextMonth}
									className="p-2 hover:bg-gray-100 rounded-full transition-colors"
								>
									<ChevronRight className="h-4 w-4" />
								</button>
							</div>

							<div className="grid grid-cols-7 gap-1 mb-2">
								{weekDays.map(day => (
									<div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
										{day}
									</div>
								))}
							</div>

							<div className="grid grid-cols-7 gap-1">
								{getCalendarDays(nextMonthDate).map((day, index) => (
									<div key={index} className="aspect-square">
										{day && (
											<button
												onClick={() => handleDateClick(day)}
												className={`w-full h-full flex items-center justify-center text-sm rounded-full transition-all duration-150 ${isDateSelected(day)
														? 'bg-gray-900 text-white font-medium'
														: isDateInRange(day)
															? 'bg-gray-200 text-gray-900'
															: isToday(day)
																? 'bg-gray-100 text-gray-900 font-medium'
																: 'text-gray-700 hover:bg-gray-100'
													}`}
											>
												{day.getDate()}
											</button>
										)}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
						<button
							onClick={() => {
								setSelectedRange({ from: undefined, to: undefined })
								setOpen(false)
							}}
							className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
						>
							Clear
						</button>
						<button
							onClick={() => setOpen(false)}
							className="px-6 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	)
}