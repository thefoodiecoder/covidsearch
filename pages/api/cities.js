export default (req, res) => {
    res.status(200).json({
        cities: [
            "Pune",
            "Mumbai",
            "Delhi",
            "Kolkata",
            "Chennai"
        ]
    })
}