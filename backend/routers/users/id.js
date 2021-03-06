import isLoggedIn from "../../utils/isLoggedIn";
import User, {profileInfo} from "../../schemas/User";

export default function (route) {
    // GET /api/users/:id
    // get profiles of a user
    route.get(isLoggedIn, async (req, res) => {
        const id = req.params.id;
        const user = await User.findById(id, profileInfo).exec();
        if (user) return res.status(200).json(user);
        else return res.status(404).json({message: "User ID not found"});
    });

    // POST /api/users/:id
    // rate a user by its id
    // rating should be between 0 and 1
    route.post(isLoggedIn, async (req, res) => {
        if (req.user._id.equals(req.params.id)) return res.status(403).json({message: "You cannot rate yourself!"});
        const user = await User.findById(req.params.id, profileInfo).exec();
        if (!user) return res.status(404).json({message: "User ID not found"});
        if (!req.body || !req.body.rating) return res.status(400).json({message: "body.rating is required"});
        const rating = parseFloat(req.body.rating);
        if (rating < 1 || rating > 5) return res.status(400).json({message: "body.rating should be between 1 and 5"});
        user.rating = (user.rating * user.numberRated + rating) / (user.numberRated + 1);
        user.numberRated += 1;
        await user.save();
        return res.status(201).json({message: "User rated", data: user});
    })
}