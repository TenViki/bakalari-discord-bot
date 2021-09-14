import { blue, grey, red, yellow } from "colors";
import config from "config";
import { promisify } from "util";
import * as fs from "fs";
import AdmZip from "adm-zip";
import { getFormattedDate, getFormattedDateForLogging } from "./date";

const createZip =
  config.get("create-log-zips") === undefined
    ? true
    : config.get("create-log-zips");

const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

export const setup = async () => {
  const files = await readdir("logs/");
  if (files.includes("latest.log") && createZip) {
    // Creates new instance of archived file and adds latest.log to it as log.txt
    const logAcrchive = new AdmZip();
    logAcrchive.addLocalFile("logs/latest.log", "", "log.txt");

    // Writes the log to the logs directory
    logAcrchive.writeZip(`logs/${getFormattedDate(new Date())}.zip`);
  }

  // Deletes the latest.log file
  await writeFile("logs/latest.log", "");
};

export const info = async (text: string) => {
  const date = getFormattedDateForLogging(new Date());
  console.log(grey(`[${date}] `) + blue("[INFO] ") + text);
  await appendToLog(`[${date}] [INFO] ${text}`);
};

export const warn = async (text: string) => {
  const date = getFormattedDateForLogging(new Date());
  console.log(grey(`[${date}] `) + yellow("[WARN] ") + text);
  await appendToLog(`[${date}] [WARN] ${text}`);
};

export const error = async (message: string, ex: any) => {
  const date = getFormattedDateForLogging(new Date());
  console.log(grey(`[${date}] `) + red("[ERR] ") + ex.message);
  console.log(red(ex));
  await appendToLog(`[${date}] [ERR] ${message}`);
  await appendToLog(ex.stack);
};

const appendToLog = async (text: string) => {
  await appendFile("logs/latest.log", text + "\n", "utf8");
};
