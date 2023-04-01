import adminModel from "../models/adminSchema.js";
import { adminToken,} from "../middleware/auth.js";

//admin login submit

export const adminLogin = async (req, res, next) => {
    try {
        let adminResult = {
            Status: false,
            message: null,
            token: null,
        };
        let adminDetails = req.body;
        const admin = await adminModel.findOne({ email: adminDetails.email });
        if (admin) {
            if (admin.password === adminDetails.password) {
                const token = adminToken(admin);
                adminResult.Status = true;
                adminResult.token = token;
                res.json({ adminResult });
            } else {
                adminResult.message = "Your Password not matched";
                res.json({ adminResult });
            }
        } else {
            adminResult.message = "Your email is wrong";
            res.json({ adminResult });
        }
    } catch (error) {
        console.log(error.message);
    }
};
