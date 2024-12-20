export function calculateLocalTime(timestamp) {
    // Convert the timestamp to milliseconds (API gives it in seconds)
    const localTimeStamp = timestamp * 1000; // Convert the timestamp from seconds to milliseconds
    
    // Create a Date object with the UTC timestamp
    const localTime = new Date(localTimeStamp);
        
    // Get the hour, minute, and AM/PM format
    const hour = String(localTime.getHours() % 12 || 12).padStart(2, '0'); // 12-hour format
    const minute = String(localTime.getMinutes()).padStart(2, '0'); // Minute with leading zero
    const AmPm = localTime.getHours() < 12 ? 'AM' : 'PM'; // Determine AM/PM
    
    return { hour, minute, AmPm };
  }
