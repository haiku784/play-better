// MongoDB schema for storing gameplay sessions
type GameplaySession {
    userId: String,
    sessionData: Object,
    timestamp: Date
}