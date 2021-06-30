const normal = {
    temp: 0, humi: 0, co2: 0
}

const statistics = {
    temp_max: 0, temp_min: 0, temp_avg : 0,
    humi_max: 0, humi_min: 0, humi_avg : 0,
    co2_max : 0, co2_min : 0, co2_avg  : 0
}

const data = { 
    vtsf     : normal,
    trsf     : normal,
    vtsfa    : normal,
    vtsfb    : normal,
    vtsf_st  : statistics,
    trsf_st  : statistics,
    vtsfa_st : statistics,
    vtsfb_st : statistics
}

console.log(data);

export {
    data,
}