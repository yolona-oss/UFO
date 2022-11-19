import React, { useState } from 'react'

import styles from './Recording.module.scss'

import Calendar from 'react-calendar'

function SelectedDate({date, remove}: {date: Date, remove: (date: Date) => void}) {
        return (
                <div className={styles["selected-day"]}>
                        <div className={styles.day}>{date.toLocaleDateString()}</div>
                        <span onClick={() => remove(date)} className="material-symbols-outlined">close</span>
                </div>
        )
}

export default function() {
        let [ selectedDates, setSelectedDates ] = useState<Array<Date>>([new Date()])

        const removeDate = (date: Date) => setSelectedDates(selectedDates.filter((_date => _date != date)))
        const addDate = (date: Date) => setSelectedDates([...selectedDates, date])

        function onClickDay(date: Date) {
                if (selectedDates.includes(date)) {
                        removeDate(date)
                } else {
                        addDate(date)
                }
        }

        return (
                <div className={styles["select-date"]}>
                        <Calendar
                                allowPartialRange
                                selectRange
                                showNeighboringMonth={false}
                                onClickDay={onClickDay}
                                minDate={new Date()}
                                value={selectedDates}
                                />
                        <div className={styles["selected-dates"]}>
                                {selectedDates.map(( date, i ) => (
                                        <SelectedDate key={i} date={date} remove={removeDate} />
                                ))}
                        </div>
                </div>
        )
}
