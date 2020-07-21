export type ThaiAddress = {
  /**
   * ตำบล
   */
  district: string;

  /**
   * ตำบล
   */
  amphoe: string;

  /**
   * จังหวัด
   */
  province: string;

  /**
   * รหัสไปรษณีย์
   */
  zipcode: number;

  /**
   * ตอนนี้ไม่รองรับการใช้งาน *geographic database
   */
  district_code?: string;

  /**
   * ตอนนี้ไม่รองรับการใช้งาน *geographic database
   */
  amphoe_code?: string;

  /**
   * ตอนนี้ไม่รองรับการใช้งาน *geographic database
   */
  province_code?: string;
};
