const Notification = ({notification}) => {
    if(message === null) {
        return null
    } 

    const notifStyle = {
      color: notification.type === 'alert' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    return (
        <div style={style}>
            {notification.message}
        </div>
    )
  }