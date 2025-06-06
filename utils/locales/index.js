const fs = require('fs');
const crowdin = require('@crowdin/crowdin-api-client');
const config = require('./config.json');
const { translationsApi } = new crowdin.default({
	token: config.crowdin.token,
});
const projectId = config.crowdin['app-id'];
const fileId = config.crowdin['file-id'];

function downloadTranslations() {
	config.localization['list-locale'].forEach(async (language) => {
		const downloadLink = await translationsApi.buildProjectFileTranslation(projectId, fileId, {
			targetLanguageId: language,
		});
		const response = await fetch(downloadLink.data.url);
		const translations = await response.json();
		fs.writeFileSync(`./src/locales/locale_${language}.json`, JSON.stringify(translations));
	});
}

function getAllLocals() {
	let local = [];
	config.localization['list-locale'].forEach((language) => {
		local[language] = JSON.parse(fs.readFileSync(`./src/locales/locale_${language}.json`)); //translation
		if (config.local['use-default-local']) {
			local[config.localization['default-locale']] = JSON.parse(fs.readFileSync(`./src/locale.json`)); //default (English)
		}
	});

	return local;
}

function allLocalToBuild(locales) {
	let model = {};
	if (config.local['use-default-local']) {
		model = JSON.parse(fs.readFileSync(`./src/locale.json`)); //default (English)
	} else {
		model = JSON.parse(fs.readFileSync(`./src/build/locale_${config.localization['list-local'][0]}.json`));
	}
	let endLocal = {};
	for (const C1 in model) {
		const C1C = model[C1];
		endLocal[C1] = {};
		if (typeof C1C == 'object') {
			for (const C2 in C1C) {
				const C2C = C1C[C2];
				endLocal[C1][C2] = {};
				if (typeof C2C == 'object') {
					for (const C3 in C2C) {
						const C3C = C2C[C3];
						endLocal[C1][C2][C3] = {};
						if (typeof C3C == 'object') {
							for (const C4 in C3C) {
								const C4C = C3C[C4];
								endLocal[C1][C2][C3][C4] = {};
								if (typeof C4C == 'object') {
									for (const C5 in C4C) {
										const C5C = C4C[C5];
										endLocal[C1][C2][C3][C4][C5] = {};
										if (typeof C5C == 'object') {
											for (const C6 in C5C) {
												const C6C = C5C[C6];
												endLocal[C1][C2][C3][C4][C5][C6] = {};
												if (typeof C6C == 'object') {
													for (const C7 in C6C) {
														const C7C = C6C[C7];
														endLocal[C1][C2][C3][C4][C5][C6][C7] = {};
														if (typeof C7C == 'object') {
															for (const C8 in C7C) {
																const C8C = C7C[C8];
																endLocal[C1][C2][C3][C4][C5][C6][C7][C8] = {};
																if (typeof C8C == 'object') {
																	for (const C9 in C8C) {
																		const C9C = C8C[C9];
																		endLocal[C1][C2][C3][C4][C5][C6][C7][C8][C9] = {};
																		if (typeof C9C == 'object') {
																			for (const C10 in C9C) {
																				const C10C = C9C[C10];
																				endLocal[C1][C2][C3][C4][C5][C6][C7][C8][C9][C10] = {};
																				if (typeof C10C == 'object') {
																				} else {
																					for (const local in locales) {
																						endLocal[C1][C2][C3][C4][C5][C6][C7][C8][C9][C10][local] = locales[local][C1][C2][C3][C4][C5][C6][C7][C8][C9][C10] ?? null;
																					}
																				}
																			}
																		} else {
																			for (const local in locales) {
																				endLocal[C1][C2][C3][C4][C5][C6][C7][C8][C9][local] = locales[local][C1][C2][C3][C4][C5][C6][C7][C8][C9] ?? null;
																			}
																		}
																	}
																} else {
																	for (const local in locales) {
																		endLocal[C1][C2][C3][C4][C5][C6][C7][C8][local] = locales[local][C1][C2][C3][C4][C5][C6][C7][C8] ?? null;
																	}
																}
															}
														} else {
															for (const local in locales) {
																endLocal[C1][C2][C3][C4][C5][C6][C7][local] = locales[local][C1][C2][C3][C4][C5][C6][C7] ?? null;
															}
														}
													}
												} else {
													for (const local in locales) {
														endLocal[C1][C2][C3][C4][C5][C6][local] = locales[local][C1][C2][C3][C4][C5][C6] ?? null;
													}
												}
											}
										} else {
											for (const local in locales) {
												endLocal[C1][C2][C3][C4][C5][local] = locales[local][C1][C2][C3][C4][C5] ?? null;
											}
										}
									}
								} else {
									for (const local in locales) {
										endLocal[C1][C2][C3][C4][local] = locales[local][C1][C2][C3][C4] ?? null;
									}
								}
							}
						} else {
							for (const local in locales) {
								endLocal[C1][C2][C3][local] = locales[local][C1][C2][C3] ?? null;
							}
						}
					}
				} else {
					for (const local in locales) {
						endLocal[C1][C2][local] = locales[local][C1][C2] ?? null;
					}
				}
			}
		} else {
			for (const local in locales) {
				endLocal[C1][local] = locales[local][C1] ?? null;
			}
		}
	}
	fs.writeFileSync(`./locales.json`, JSON.stringify(endLocal));
	console.log('All locales have been built successfully!');
}

module.exports = () => {
	if (!fs.existsSync('./src/')) {
		fs.mkdirSync('./src/');
	}
	if (!fs.existsSync('./src/build')) {
		fs.mkdirSync('./src/build');
	}
	if (!fs.existsSync('./src/locales')) {
		fs.mkdirSync('./src/locales');
	}

	if (!fs.existsSync('./src/locale.json') && config.local['use-default-local']) return console.error('ERR | There no default local, read doc');

	downloadTranslations();

	setTimeout(() => {
		allLocalToBuild(getAllLocals());
	}, 5000);

	return true;
};
