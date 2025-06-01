const { getuserwithid } = require("../controllers/session/auth");

async function restrict_to_login_user_only(req, res, next) {
    const user_id = req.cookies?.uid;

    if (!user_id) {
        return res.redirect("/login");
    }

    const user = await getuserwithid(user_id);
    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

async function check_auth(req, res, next) {
    const user_id = req.cookies?.uid;
    const user = await getuserwithid(user_id);
    req.user = user;
    next();
}

async function checkForAuthentication(req, res, next) {
    const tokenvalue = req.cookies?.uid;
    req.user = null;

    if (!tokenvalue) {
        return next();
    }

    const user = await getuserwithid(tokenvalue);
    if (!user) {
        return next();
    }

    req.user = user;
    next();
}

// function restrictTo(role = []) {
//     // console.log("executed");
//     return function (req, res, next) {
//         if (!req.user) return res.redirect("/login");
//         if (!role.includes(req.user.role)) return res.status(403).send("You Are UnAuthorized");
//         next();
//     };
// }

function restrictTo(role = []) {
    return function (req, res, next) {
        console.log("Restrict middleware executed");
        console.log("User in req.user:", req.user);
        if (!req.user) {
            console.log("No user, redirecting to login");
            return res.redirect("/login");
        }
        if (!role.includes(req.user.role)) {
            console.log("User role not allowed:", req.user.role);
            return res.status(403).send("You Are UnAuthorized");
        }
        console.log("Access granted to role:", req.user.role);
        next();
    };
}


module.exports = {
    checkForAuthentication,
    restrictTo,
    restrict_to_login_user_only,
    check_auth,
};
