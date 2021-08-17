module.exports = (req, res, next) => {
    console.log("----", req.method, req.path);
    if (req.method === "POST" && req.path === "/login") {
        console.log(req.body.username);
        console.log(req.body.password);
        if (req.body.username === "a" && req.body.password === "123") {
            return res.status(200).json({
                user: {
                    token: "123",
                },
            });
        } else {
            return res.status(400).json({
                message: "用户名或密码错误",
            });
        }
    }
    next();
};
