/**
 * @swagger
 * /recordings:
 *   get:
 *     summary: Retrieve all recordings
 *     description: Get a list of all recordings.
 *     responses:
 *       200:
 *         description: A list of recordings.
 */
app.get('/recordings', (req, res) => {
    // Logic to fetch recordings
    res.status(200).send([/* Sample data */]);
});