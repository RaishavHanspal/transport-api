import expressLoader from "./express";
import mongooseLoader from "./mongoose";
/** load or initialize various components/dependencies to start using the connection */
export const load = async ({ expressApp }) => {
    await mongooseLoader();
    await expressLoader({ expressApp });
};
