{
  type: 'object',
  properties: {
    annotationId: { type: 'string' },
    videoId: { type: 'string' },
    userId: { type: 'string' },
    comment: { type: 'string' },
    timestamp: { type: 'number' },
    createdAt: { type: 'date' }
  },
  required: ['annotationId', 'videoId', 'userId', 'comment', 'timestamp']
}