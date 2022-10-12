const objectToCsv = async (data) => {
    return (
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((d) => Object.values(d).join(",")).join("\n")
    );
  }

  module.exports = { objectToCsv }