import { User } from "../models";
import ApiError from "../helpers/error/ApiError";
import httpStatus from "http-status";
import { ERROR } from "../helpers/response.message";
import { comparePassword, jwtSignIn, generatePasswords } from "../config/authentication";
import { formatPagination, formatPaginationResponse } from "../config/pagination";

export const login = async (user_name, password) => {
    try {
        let isEmail = await checkIsEmail(user_name);
        let query = {};
        query = isEmail ? { email: user_name.toLowerCase() } : { phone: user_name };
        let data = await getUser(query);
        console.log("data", data)
        if (!data) throw new ApiError(httpStatus.NOT_FOUND, ERROR.USER.NOT_FOUND);
        let isPasswordMatch = await comparePassword(data?.password, password);
        if (!isPasswordMatch) throw new ApiError(httpStatus.UNAUTHORIZED, ERROR.CREDENTIALS.INVALID);
        let authToken = await jwtSignIn({ _id: data?.id });
        delete data?.password;
        return {
            user: data,
            token: authToken
        };
    } catch (e) {
        console.log("error while login", e)
        throw e;
    }
};

export const register = async (data) => {
    try {
        let { name, email, phone, password } = data;
        let emailExist = await getUser({ email: email.toLowerCase() });
        if (emailExist) throw new ApiError(httpStatus.BAD_REQUEST, ERROR.USER.EMAIL_EXIST);
        let phoneExist = await getUser({ phone: phone.toString() });
        if (phoneExist) throw new ApiError(httpStatus.BAD_REQUEST, ERROR.USER.PHONE_EXIST);
            let hashedPassword = await generatePasswords(password);
            data.password = hashedPassword;
            data.email = email.toLowerCase();
            let createUser = {};
            createUser = await User.create(data);
            createUser = createUser.toJSON()
            delete createUser.password;
        return createUser;
    } catch (e) {
        throw e
    }
}

export const getUsersWithPagination = async (authUser, search, pagination) => {
    try {
        let filter = {};
        filter['_id'] = {$ne:authUser._id}
        if(search && search != ""){
            filter["$or"] = [
                { name:{ $regex: `^${search}`, $options: "i" }},
                { email: { $regex: `^${search}`, $options: "i"}},
                { phone: { $regex: `^${search}`, $options: "i"}},
            ];
        }
        let paginationData = await formatPagination( pagination.limit, pagination.page );
        let _query = [
			{ $match: filter },
			{ $sort: { name: 1 } },
			{ $skip: paginationData.skip },
			{ $limit: paginationData.limit },
            { $project: { password:0}}
		];
        console.log("authUser", authUser)
		let result = await User.aggregate(_query);
		let totalCount = await User.countDocuments(filter);
		result = JSON.parse(JSON.stringify(result));
		return await formatPaginationResponse( pagination.limit, totalCount, result, pagination.page );
    } catch (error) {
        console.log("error while getting data", error)
        throw error;
    }
}

export const getUser = async (query) => {
    try {
        let data = await User.findOne(query);
        return data ? data : undefined;
    } catch (error) {
        throw error;
    }
}

export const checkIsEmail = async (user_name) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isEmail = emailRegex.test(user_name) ? true : false;
        return isEmail;
    } catch (error) {
        throw error;
    }
}