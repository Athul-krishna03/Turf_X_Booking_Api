import { authorizeRole, decodeToken, verifyAuth } from "../../../interface/middlewares/authMiddleware"
import { authController, blockStatusMiddleware, bookingController, slotController, turfController } from "../../di/resolver"
import { BaseRoute } from "../baseRoute"
import { Request,RequestHandler,Response } from "express"

export class TurfRoutes extends BaseRoute{
    constructor(){
        super()
    }

    protected initializeRoutes(): void {
        this.router.post(
            "/turf/logout",
            verifyAuth,
            authorizeRole(["turf"]),
            (req:Request,res:Response)=>{
                console.log("logout");
                authController.logout(req,res)
            }
        ),
        this.router.post(
            "/turf/refresh-token",
            decodeToken,
            (req:Request,res:Response)=>{
                console.log("refresh Token triggered");
                authController.refreshToken(req,res);
            }
        ),
        this.router.post(
            "/turf/generateSlots",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                console.log("inside route save");
                turfController.generateSlots(req,res);
            }
        ),
        this.router.patch(
            "/turf/updateProfile",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                console.log(req.body);
                
                turfController.editTurf(req,res)
            }
        ),
        this.router.patch(
            "/turf/change-password",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                turfController.updateTurfPassword(req,res);
            }
        ),
        this.router.get(
            "/turf/slots",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                turfController.getSlots(req,res);
            }
        ),
        this.router.patch(
            "/turf/updateSlot",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                slotController.updateSlotStatus(req,res);
            }
        ),
        this.router.get(
            "/turf/getBookingDetials",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                bookingController.getAllBookingData(req,res)
            }
        ),
        this.router.patch(
            "/turf/cancelBooking",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                bookingController.cancelBookingTurfOWner(req,res)
            }
        ),
        this.router.get(
            "/turf/getTurfDashBoardData",
            verifyAuth,
            authorizeRole(["turf"]),
            blockStatusMiddleware.checkStatus as RequestHandler,
            (req:Request,res:Response)=>{
                bookingController.getTurfDashBoardData(req,res)
            }
        )
    }

} 