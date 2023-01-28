import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

const Base ={
    fontFamily: typography.primary,
    fontSize:16,
    color: colors.white
}

const Base_Bold ={
    fontFamily: typography.primaryBold,
    fontSize:16,
    color: colors.white
}
const Bold ={
    fontFamily: typography.bold,
    color: colors.white
}

export const presets ={
    default:Base,
    Bold:Bold,
    h1:{
        ...Bold,
        fontSize:32
    },
    h2:{
        ...Bold,
        fontSize:28
    },
    h3:{
        ...Base_Bold,
        fontSize:24
    },
    h4:{
        ...Base_Bold,
        fontSize:14
    },
    small:{
        ...Base,
        fontSize:12
    },
}