// write a dummy function to get user contact data
const getUserContactData = (req, res) => {
    res.status(200).json({
        brandName: 'My Brand',
        email: "abc@gmail.com",
        phone: '123-456-7890',
        address: '123 Main St, City, State 12345',
    })
}

// export the function
export default getUserContactData