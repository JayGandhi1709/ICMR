import express from "express";
import { HFAT3 } from "../Database/HFAT-3.js";
const app = express();

export const HFAT3Controller = async (req, res) => {
  var { completeFormHfat3, table1, table2, table3, table4 } = req.body;
  // completeFormHfat3 = JSON.parse(completeFormHfat3);
  // table1 = JSON.parse(table1);
  // table2 = JSON.parse(table2);
  // table3 = JSON.parse(table3);
  // table4 = JSON.parse(table4);

  completeFormHfat3 = completeFormHfat3 ? JSON.parse(completeFormHfat3) : {};
  table1 = table1 ? JSON.parse(table1) : {};
  table2 = table2 ? JSON.parse(table2) : {};
  table3 = table3 ? JSON.parse(table3) : {};
  table4 = table4 ? JSON.parse(table4) : {};

  HFAT3.countDocuments({ H3A2: completeFormHfat3?.H3A2 }).then((response) => {
    console.log(typeof response);

    const combinedData = {
      ...completeFormHfat3,
      table1,
      table2,
      table3,
      table4,
      uniqueCode: `${completeFormHfat3.H3A2}_${response + 1}`,
    };
    HFAT3.create(combinedData)
      .then((result) => {
        res.status(200).json({ success: "data saved", result });
      })
      .catch((err) => {
        res.status(400).json({ error: "error for data save" });
      });
  });

  // const hfat3 = req.body;
  // hfat3 = JSON.parse(hfat3);
  // try {
  //   HFAT3.find({ H3A2: hfat3?.H3A2 }).then((response) => {
  //     const newHFAT3 = new HFAT3({
  //       uniqueCode: `${hfat3.H3A2}_${response.length + 1}`,
  //       ...hfat3,
  //     });
  //     // const newHFAT3 = new HFAT3(hfat);
  //     newHFAT3.save();
  //     res.status(201).json(newHFAT3);
  //   });
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};
