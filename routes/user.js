import express from "express";
import { faker } from '@faker-js/faker';
import { successResponse } from "../helpers";
import mongoose, { Types } from "mongoose";


const router = express.Router({ mergeParams: true });
router.get('/data_seeding', async (req, res) => {
    try {
    let i = 0;
    let users = [];
    let address = [
    {
    "country" : "India",
    "countryId" : new Types.ObjectId("57ca8f61dcba0f63c1d0817a"),
    
    "state" : "Rajastan",
    "stateId" : new Types.ObjectId("63076e001d695fb5777c145c"),
    
    "district" : "NAGAUR",
    "districtId" : new Types.ObjectId("62d15612f6c8cf0010097697"),
    
    "block" : "JAYAL",
    "blockId" : new Types.ObjectId("62d15612f6c8cf001009769b"),
    
    "panchayatName" : "SANDEELA",
    "panchayatId" : new Types.ObjectId("62d15612f6c8cf001009769f"),
    },
    ];
    let examSlots = [
    "64257fc0b3a90b02dc3a3b4a"
    ];
    let examIds = [
    "641887c10803680011710ba3"
    ]
    let user = {};
    user = {
    "creationTime": new Date(),
    "createdBy" : "",
   
    "lastUpdationTime": new Date(),
    "lastUpdatedBy": "",
   
    "role" : "Student",
    "roleId" : new Types.ObjectId("63241853b6cf5030630ad641"),
    "studentType" : "pvt",
   
    "password" : "$2a$10$rYQ.Ik7xna983VsET6EtpeoFEfAwgTS0kxXEMPZ8K/hwIpWQHUCsq",
    "resetInitialPassword" : true,
   
    "msStatus" : "create",
    "approvalStatus" : 1,
    "qualifications" : {
    "graduate" : [ ],
    "postGraduate" : [ ],
    "professional" : [ ],
    "other" : [ ]
    },
   
    "association" : {
    "name" : "LiL Open Courses",
    "id" : "58a998ec0000000000000000",
    "isApproved" : true
    },
   
    "authUploaded" : false,
    "branch" : "TEST SCHOOL",
    "branchId" : null,
    "domainId" : 5001,
   
    "grade" : "I",
    "gradeId" : new Types.ObjectId("5c13877c777f0f0013b5f3d7"),
    "isArchived" : false,
    "learningLevel" : "Senior Secondary",
    "learningLevelId" : new Types.ObjectId("5bd0111d71ab7000149947d5"),
    
   
    "section" : "undefined",
    "sectionId" : new Types.ObjectId("6443c1d8d148da001189fc64"),
    }
    faker.locale = "en_IND";
    while(i < 10){ 
    let name = faker.name.firstName();
    let email = faker.internet.email().toLowerCase();
    let mobile = faker.phone.number('63########');
    let location = address[0];
    let names = name.split(" ");
    let firstName = names.length > 0 ? names[0] : name;
    let lastName = names.length > 1 ? names[1] : "";
    
    let new_user = {
    "firstName":firstName,
    "lastName":lastName,
    "email" : email,
    "mobile" : `+91${mobile}`,
    "enrollmentNumber" : mobile,
    "username" : mobile,
   
    "country" : location?.country,
    "countryId" : location?.countryId,
   
    "state" : location?.state,
    "stateId" : location?.stateId,
   
    "district" : location.district,
    "districtId" : location.districtId,
   
    "block" : location.block,
    "blockId" : location.blockId,
   
    "panchayatName" : location.panchayatName,
    "panchayatId" : location.panchayatId,
   
    "DUMMY_DATA":true,
    // _id: new Types.ObjectId(),
    ...user
    }
    console.log("randomEmail", new_user)
    users.push(new_user);
    
    i++
    }
    console.log("users", users)
    let re = await mongoose.connection.collection("user").insertMany(users);
    console.log("re===========>",Object.values(re.insertedIds)); 
    let userDetails = await mongoose.connection.collection("user").find({_id:{$in:Object.values(re.insertedIds)}}).toArray();
    console.log("userDetails", userDetails.length);
    let registerOnExamSlot = {};
    let questionResponses = [];
    
    for await (let usr of userDetails){
        const scores = Math.floor(Math.random() * 8) + 1;
    let questionResponse = {
    "creationTime" : new Date(),
    "lastUpdationTime" : new Date(),
   
    "examId" : new Types.ObjectId(examIds[0]),
    "examType" : "mainExam",
    "slotId" : new Types.ObjectId(examSlots[0]),
    "score" : scores,
    "questions" : [
    {
    "id" : "641423501993d60013b8e1e8",
    "options" : [
    {
    "content" : "\r\n\r\n\r\npost-Gupta inscriptions",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\npre-Gupta inscriptions",
    "isCorrect" : true
    },
    {
    "content" : "\r\n\r\n\r\nearly Buddhist texts",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\nearly Vedic texts",
    "isCorrect" : false
    }
    ],
    "qText" : "The term Brahmadeya occurs for the first time in",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 0,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 0,
    "selectedOption" : [ "\r\n\r\n\r\npost-Gupta inscriptions" ],
    "tt" : 10
    },
    {
    "id" : "641423501993d60013b8e1e0",
    "options" : [
    {
    "content" : "\r\n\r\n\r\nJalauka",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\nMahendra",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\nTivara",
    "isCorrect" : true
    },
    {
    "content" : "\r\n\r\n\r\nKunala",
    "isCorrect" : false
    }
    ],
    "qText" : "Though Ashoka had many sons, the inscriptions mentioned only one who is not mentioned in any other source. He is",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 0,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 0,
    "selectedOption" : [ "\r\n\r\n\r\nMahendra" ],
    "tt" : 3
    },
    {
    "id" : "641b3bae9b6a670011e0cad4",
    "options" : [
    {
    "content" : "Calm Desert",
    "isCorrect" : false
    },
    {
    "content" : "Death Valley",
    "isCorrect" : false
    },
    {
    "content" : "Great Indian Desert",
    "isCorrect" : true
    },
    {
    "content" : "Silk Desert",
    "isCorrect" : false
    }
    ],
    "qText" : "What is the other Popular name of Thar Desert?",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 0,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 0,
    "selectedOption" : [ "Calm Desert" ],
    "tt" : 3
    },
    {
    "id" : "641423501993d60013b8e1de",
    "options" : [
    {
    "content" : "\r\n\r\n\r\n241 BC",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\n301 BC",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\n321 BC",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\n261 BC",
    "isCorrect" : true
    }
    ],
    "qText" : "The Kalinga was fought in",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 0,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 0,
    "selectedOption" : [ "\r\n\r\n\r\n241 BC" ],
    "tt" : 3
    },
    {
    "id" : "641423501993d60013b8e1d8",
    "options" : [
    {
    "content" : "\r\n\r\n\r\nB.G. Tilak",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\nV.D. Savakar",
    "isCorrect" : true
    },
    {
    "content" : "\r\n\r\n\r\nS.N. Sen",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\nR.C. Mazumdar",
    "isCorrect" : false
    }
    ],
    "qText" : "The Uprising of 1857 was described as the first Indian war of Independence by",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 0,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 0,
    "selectedOption" : [ "\r\n\r\n\r\nB.G. Tilak" ],
    "tt" : 3
    },
    {
    "id" : "641b3bae9b6a670011e0cacb",
    "options" : [
    {
    "content" : "Land of Kings",
    "isCorrect" : true
    },
    {
    "content" : "Land of Sands",
    "isCorrect" : false
    },
    {
    "content" : "Land of Free",
    "isCorrect" : false
    },
    {
    "content" : "Land of Rising Sun",
    "isCorrect" : false
    }
    ],
    "qText" : "What is the Literal meaning of “Rajasthan”?",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 1,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 1,
    "selectedOption" : [ "Land of Kings" ],
    "tt" : 3
    },
    {
    "id" : "641423501993d60013b8e1dc",
    "options" : [
    {
    "content" : "\r\n\r\n\r\nGulbarga",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\nDhar",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\nAgra",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\nDelhi",
    "isCorrect" : true
    }
    ],
    "qText" : "The two principles monuments of Alaud-din Khilji's reign - the Jama at Kana Masjid and Alai Darwaza - were constructed at",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 0,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : -1,
    "selectedOption" : [ ],
    "tt" : 0
    },
    {
    "id" : "641423501993d60013b8e1e3",
    "options" : [
    {
    "content" : "\r\n\r\n\r\n1909",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\n1857",
    "isCorrect" : true
    },
    {
    "content" : "\r\n\r\n\r\n1858",
    "isCorrect" : false
    },
    {
    "content" : "\r\n\r\n\r\n1900",
    "isCorrect" : false
    }
    ],
    "qText" : "Universities in the Presidency towns in India were established in",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 1,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 1,
    "selectedOption" : [ "\r\n\r\n\r\n1857" ],
    "tt" : 3
    },
    {
    "id" : "641b3bae9b6a670011e0cacd",
    "options" : [
    {
    "content" : "Germany",
    "isCorrect" : true
    },
    {
    "content" : "Oman",
    "isCorrect" : false
    },
    {
    "content" : "Italy",
    "isCorrect" : false
    },
    {
    "content" : "Syria",
    "isCorrect" : false
    }
    ],
    "qText" : "Which country is comparable to the size of Rajasthan?",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 0,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 0,
    "selectedOption" : [ "Syria" ],
    "tt" : 2
    },
    {
    "id" : "641b3bae9b6a670011e0cad1",
    "options" : [
    {
    "content" : "North",
    "isCorrect" : false
    },
    {
    "content" : "West",
    "isCorrect" : true
    },
    {
    "content" : "South",
    "isCorrect" : false
    },
    {
    "content" : "East",
    "isCorrect" : false
    }
    ],
    "qText" : "Which direction is the desert located in Rajasthan?",
    "qImg" : "",
    "filler" : [ ],
    "marks" : 1,
    "qType" : "singleAnswer",
    "rType" : "SELECT",
    "isCorrect" : 1,
    "selectedOption" : [ "West" ],
    "tt" : 3
    }
    ],
    "totalQuestions" : 10,
    "attemptedQuestions" : 10,
    "correctionCount" : scores,
    "isTestComplete" : true,
    "timeRemaining" : 0,
    "marksPerQuestion" : 1,
    "passingMarks" : 70,
    "tt" : Math.floor(Math.random() * 5) + 1
    }
    let examSlotId = examSlots[0].toString();
    if(!registerOnExamSlot[examSlotId]){
    registerOnExamSlot[examSlotId] = [];
    }
    registerOnExamSlot[examSlotId].push({
    isAttempted: true,
    isSubmitted: true,
    practiceAttempted: false,
    id: usr._id.toString(),
    name: `${usr.firstName} ${usr.lastName}`
    })
   
    questionResponses.push({
    "createdBy" : usr._id.toString(),
    "lastUpdatedBy" : usr._id.toString(),
    "districtId" : new Types.ObjectId(usr.districtId.toString()),
    "blockId" : new Types.ObjectId(usr.blockId.toString()),
    "panchayatId" : new Types.ObjectId(usr.panchayatId.toString()),
    "userId" : new Types.ObjectId(usr._id.toString()),
    ...questionResponse
    })
   
    }
   
    let bulkRegisterOnExamSlot = [];
    for await (let registerUser of Object.keys(registerOnExamSlot)){
    bulkRegisterOnExamSlot.push({
    updateOne: {
    filter: { _id: new Types.ObjectId(registerUser) },
    update: { $push: { userIds: {$each: registerOnExamSlot[registerUser]}} }
    }
    })
    }
    console.log("bulkRegisterOnExamSlot", JSON.stringify(bulkRegisterOnExamSlot))
    console.log("questionResponses", JSON.stringify(questionResponses));
   
    let r = await mongoose.connection.collection("QuestionResponse").insertMany(questionResponses);
    console.log("questionResponses", r);
    let d = await mongoose.connection.collection("ExamSlot").bulkWrite(bulkRegisterOnExamSlot);
    console.log("bulkRegisterOnExamSlot", d)
   
    return successResponse(req, res, "result");
    } catch (error) {
    console.log("error whiel generating data", error);
    throw error;
    }
   });
export default router;
