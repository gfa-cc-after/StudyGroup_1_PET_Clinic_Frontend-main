import '../styles/style.css'
import { Link } from 'react-router-dom'

const Messages = () => {
    const messages = [
        { from: 'John Doe', subject: 'Meeting Reminder', sent: '02.01. 12:30 PM' },
        { from: 'Jane Smith', subject: 'Payment Reminder', sent: '01.30. 10:45 AM' },
        { from: 'Alice Johnson', subject: 'Feedback Request', sent: '01.25. 09:30 AM' },
    ];

    return (
        <div className='prettybackground-box'>
            <div className='userhome-bg'></div>
            <div className='userhome'>
                    <Link className="colored-button" disabled="true" to="" >New message</Link>
                <h3 className="home-h3">Inbox</h3>
                <form className='userhome-content'>
                    <table className="home-table" data-testid="pet-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="select-all" id="select-all" /></th>
                                <th>From</th>
                                <th>Subject</th>
                                <th>Sent</th>
                                <th><button type="button">Delete</button></th>
                                <th><button type="button">Mark as read</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(messages.length > 0) && messages.map((msg, index) => (
                                <tr key={index} data-testid="pet-row">
                                    <td><input type="checkbox" name="select" id="select" /></td>
                                    <td>{msg.from}</td>
                                    <td>{msg.subject}</td>
                                    <td>{msg.sent}</td>
                                    <td><button>Delete</button></td>
                                    <td><button>Mark as read</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export { Messages };
