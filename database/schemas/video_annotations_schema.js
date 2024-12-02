{
  collection: 'video_annotations',
  schema: {
    annotationId: { type: ObjectId, required: true },
    userId: { type: String, required: true },
    gameplayMoment: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }
}