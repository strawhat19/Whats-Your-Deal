app.post(`/api/userStocks/${symbol}:edit`, async (req, res) => {
    const result = await userData.updateOne({ _id: `${userID}` }, {
        $pullAll: {
            userStocks: [symbol],
        },
    });
    console.log(result);
    if (!result) {
        return { status: 'error', error: 'Couldnt find Stock' }
    }
    else {
        return res.json({ status: 'ok', userFound: true, user: userFound })
    }
})

