import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
export const registercompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Comapany name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });

    //duplicate company
    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }
    //creates new company and set the userId
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Comapany registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//only get company which are created by that particular person not all thats why search by id
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in userid
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(400).json({
        message: "companies not found",

        success: false,
      });
    }
    return res.status(200).json({
      message: "Registered companies",
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//get comapnay by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "company not found",
        message: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    //cloudinary here
    //console.log({ name, description, website, location });
     let logo; // optional logo update

    if (req.file) {
      // only if a new file is uploaded
      const fileuri = getDataUri(req.file);
      const cloudinaryResponse = await cloudinary.uploader.upload(fileuri.content);
      logo = cloudinaryResponse.secure_url;
    }

    const updateData = {
      name,
      description,
      website,
      location,
      ...(logo && { logo }) 
    };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};
