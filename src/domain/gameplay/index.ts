// Core domain model for gameplay features
class GameplaySession {
    constructor(public id: string, public playerId: string, public duration: number) {}
}

class AnalysisReport {
    constructor(public sessionId: string, public statistics: object) {}
}

class VideoAnnotation {
    constructor(public sessionId: string, public timestamp: number, public comment: string) {}
}