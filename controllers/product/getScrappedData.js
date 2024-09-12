import ZenRows from "zenrows";
export const getScrappedData = async function (req, res) {
  try {
    const client = new ZenRows("392d813d73448acb7ab958d036ffa549c312ad6c");
    const url = "https://www.myntra.com";

    const request = await client.get(url, {});
    const data = await request.json();

    return res.status(201).json({
      message: "Get Scrapped successfully",
      data,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Error in Scrapped Product API",
      success: false,
      error,
    });
  }
};
