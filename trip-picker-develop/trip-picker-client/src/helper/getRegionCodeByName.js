import regionInfo from "./regionInfo";
const getRegionCodeByName = name => {
  const [sido, sigungu] = name.split(",");
  let sidoCode, sigunguCode;
  Object.values(regionInfo).forEach(info => {
    if (info.sido === sido && info.sigungu === sigungu) {
      sidoCode = info.sidoCode;
      sigunguCode = info.sigunguCode;
    }
  });
  return [sidoCode, sigunguCode];
};

export default getRegionCodeByName;
