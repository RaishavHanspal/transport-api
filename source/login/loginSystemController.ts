import mongoose from "mongoose";
import { Request, Response } from "express";
export class loginSystemController{
    constructor(private loginModel: mongoose.Model<any, unknown, unknown, unknown, any>){
        this.loginModel = loginModel;
        console.log(this, loginModel)
        console.log("loginSystemController:: Instance created!");
    }

    /** on user login validates if entry is available in database and return respective info */
    public login(req: Request, res: Response): void{
        this.loginModel && this.loginModel.findOne({ username: req.body.username }).then((user: any): void => {
            if(!user){
                res.send("User not registered! Signup if you are a new user.");
            }
            else if(user.password === req.body.password){
                res.send("Logged in successful!!");
            }
            else{
                res.send("Username or password is incorrect!");
            }
        })
    }

    /** signup - only allows single insertion of user details, will not allow duplicate username in database */
    public signup(req: Request, res: Response): void{
        this.loginModel && this.loginModel.findOne({ username: req.body.username }).then((user: any): void => {
            if(!user){
                this.loginModel.insertMany([{ username: req.body.username, password: req.body.password }]).then(() => {
                    res.send("Signup successful, Login to continue");
                }).catch(() => {
                    res.send("Issue while updating database");
                })
            }
            else{
                res.send("User already registered! ");
            }
        }).catch((err) => {
            res.send("Please try again!");
        });
    }
}