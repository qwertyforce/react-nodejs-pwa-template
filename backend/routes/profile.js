function profile (req,res){
	if (req.session.authed !== undefined) {
        res.send('<p>You are logged in! You can see you profile</p><div><a href="/logout">Logout</a></div>')
    } else {
        res.redirect('/login')
    }
}

module.exports = profile;