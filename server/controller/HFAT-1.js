import express, { response } from "express";
import mongoose from "mongoose";
import { HFAT1 } from "../Database/HFAT-1.js";
const app = express();

export const HFAT1Controller = async (req, res) => {
  var { completeFormHfat1, table1, table2, table3, table4 } = req.body;
  // console.log(completeform, table1, table2, table3, table4);
  // completeFormHfat1 = JSON.parse(completeFormHfat1);
  // table1 = JSON.parse(table1);
  // table2 = JSON.parse(table2);
  // table3 = JSON.parse(table3);
  // table4 = JSON.parse(table4);

  completeFormHfat1 = completeFormHfat1 ? JSON.parse(completeFormHfat1) : {};
  table1 = table1 ? JSON.parse(table1) : {};
  table2 = table2 ? JSON.parse(table2) : {};
  table3 = table3 ? JSON.parse(table3) : {};
  table4 = table4 ? JSON.parse(table4) : {};
  HFAT1.countDocuments({ A3: completeFormHfat1?.A3 }).then((response) => {
    console.log(response);
    const combinedData = {
      ...completeFormHfat1,
      table1,
      table2,
      table3,
      table4,
      uniqueCode: `${completeFormHfat1.A3}_${response + 1}`,
    };
    HFAT1.create(combinedData)
      .then((result) => {
        res.status(200).json({ success: "data saved", result });
      })
      .catch((err) => {
        res.status(400).json({ error: "error for data save" });
      });
  });

  // const hfat1 = req.body;
  // try {
  //   HFAT1.find({ A3: hfat1?.A3 }).then((response) => {
  //     const newHFAT1 = new HFAT1({
  //       uniqueCode: `${hfat1.A3}_${response.length + 1}`,
  //       ...hfat1,
  //     });
  //     // const newHFAT1 = new HFAT1(hfat);
  //     newHFAT1.save();
  //     res.status(201).json(newHFAT1);
  //   });
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};
