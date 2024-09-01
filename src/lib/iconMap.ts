import { ComponentType } from "react";
import SunIcon from "../components/icons/weather-code-icons/SunIcon";
import CloudDrizzleIcon from "../components/icons/weather-code-icons/CloudDrizzleIcon";
import CloudLightningIcon from "../components/icons/weather-code-icons/CloudLightningIcon";
import CloudRainIcon from "../components/icons/weather-code-icons/CloudRainIcon";
import SnowflakeIcon from "../components/icons/weather-code-icons/SnowflakeIcon";
import CloudFogIcon from "../components/icons/weather-code-icons/CloudFogIcon";
import CloudIcon from "../components/icons/weather-code-icons/CloudIcon";
import CloudyIcon from "../components/icons/weather-code-icons/CloudyIcon";

export const weatherIconMappings: Record<
  string,
  ComponentType<{ color: string; size: string }>
> = {
  "200": CloudLightningIcon,
  "201": CloudLightningIcon,
  "202": CloudLightningIcon,
  "210": CloudLightningIcon,
  "211": CloudLightningIcon,
  "212": CloudLightningIcon,
  "221": CloudLightningIcon,
  "230": CloudLightningIcon,
  "231": CloudLightningIcon,
  "232": CloudLightningIcon,
  "300": CloudDrizzleIcon,
  "301": CloudDrizzleIcon,
  "302": CloudDrizzleIcon,
  "310": CloudDrizzleIcon,
  "311": CloudDrizzleIcon,
  "312": CloudDrizzleIcon,
  "313": CloudDrizzleIcon,
  "314": CloudDrizzleIcon,
  "321": CloudDrizzleIcon,
  "500": CloudRainIcon,
  "501": CloudRainIcon,
  "502": CloudRainIcon,
  "503": CloudRainIcon,
  "504": CloudRainIcon,
  "511": CloudRainIcon,
  "520": CloudRainIcon,
  "521": CloudRainIcon,
  "522": CloudRainIcon,
  "531": CloudRainIcon,
  "600": SnowflakeIcon,
  "601": SnowflakeIcon,
  "602": SnowflakeIcon,
  "611": SnowflakeIcon,
  "612": SnowflakeIcon,
  "615": SnowflakeIcon,
  "616": SnowflakeIcon,
  "620": SnowflakeIcon,
  "621": SnowflakeIcon,
  "622": SnowflakeIcon,
  "701": CloudFogIcon,
  "711": CloudFogIcon,
  "721": CloudFogIcon,
  "731": CloudFogIcon,
  "741": CloudFogIcon,
  "761": CloudFogIcon,
  "762": CloudFogIcon,
  "771": CloudFogIcon,
  "781": CloudFogIcon,
  "800": SunIcon,
  "801": CloudIcon,
  "802": CloudIcon,
  "803": CloudyIcon,
  "804": CloudyIcon,
};
