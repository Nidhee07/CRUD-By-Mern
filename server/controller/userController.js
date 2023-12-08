import multer from 'multer';
import userModel from '../models/userModel.js';
import path from 'path';


// const storage = multer.memoryStorage(); // Store the image in memory
// const upload = multer({ dest: 'uploads/' }).single('photo');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

const upload = multer({ storage: storage }).single('photo');

export const create = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check if formData.photo is set
      if (!req.file) {
        return res.status(400).json({ error: 'Photo is required' });
      }

      // Create a new user instance
      const userData = new userModel({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
      });

      // Handle the uploaded photo
      if (req.file) {
        // userData.photo = {
        //   data: req.file.buffer,
        //   contentType: req.file.mimetype,
        // };
        userData.photo = req.file.path;
      }

      console.log("----req.file---", req.file);

      // Save user data
      const savedData = await userData.save();

      res.status(200).json({ msg: 'User Created Successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};


// Read items
export const getAll = async (req, res) => {
  try {
    const userData = await userModel.find(); // Change User to userModel
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error in getAll:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getOne =  async (req, res )=> {

    try {

      const id = req.params.id;
    
      const userExist = await User.findById(id);
      if(!userExist){
          return res.status(404).json({msg: "User  not found"});
      }
      res.status(200).json(userExist);
    } catch (error) {
      res.status(500).json({error: error});
    }
  
  }


   // Update item


   export const update = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await userModel.findById(id); // Change User to userModel
      if (!userExist) {
        return res.status(401).json({ msg: "User not found" });
      }
  
      // Fix: Use findByIdAndUpdate instead of findByIdandupdate
      const updatedData = await userModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({msg:"User updated Succefully"});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
   
  export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await userModel.findById(id); // Change User to userModel
  
      if (!userExist) {
        return res.status(404).json({ msg: "User not Exist" });
      }
  
      // Corrected: Use userModel instead of User
      await userModel.findByIdAndDelete(id);
  
      res.status(200).json({ msg: "User Delete successfully" });
    } catch (error) {
      console.error('Error in deleteUser:', error);
      res.status(500).json({ error: error });
    }
  };
  
  
