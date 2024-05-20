import { EventModel } from "../../../event/domain/model/event-model"

export const attendanceTemplate = (email: string, username: string, event: EventModel) => {
    return `
    <html>
    <body>
        <p>Welcome to ImIn Event!</p>
        <p>You have just attended to the event <strong> ${event.title}</strong>,</p>
        <p>It will start <strong>${event.startDate.toLocaleString()}</strong></p>
        <p>It will be located at <strong>${event.locationName}</strong>. Check the event detail <a href='http://localhost:4200/event/${event.id}'>here</a>.</p>
        <p>We will see you there. See you soon!</p>
    </body>
    </html>
    `
}