module.exports = (mongoose) => {
  const Temple = mongoose.model(
    'alerts',
    mongoose.Schema(
      {
        message: String,
        background: String,
        color: String,
      },
      { timestamps: true }
    )
  );

  return Temple;
};
