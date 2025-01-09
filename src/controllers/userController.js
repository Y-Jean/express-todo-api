import db from "../models/index.js";

// 사용자 리스트 조회
const getUserList = async (req, res) => {
  const users = await db.User.findAll({
    attributes: ["id", "name", "email"],
  });

  res.status(200).json(users);
};

// 개별 사용자 조회
const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await db.User.findByPk(userId, {
      attributes: ["id", "name", "email"],
    });

    if (!userId || !user) {
      res.status(404).json({ message: "사용자가 존재하지 않습니다." });
    }

    res.status(200).json({
      userId: user.id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getUserList, getUser };
