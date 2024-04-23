export function hasEmptyField(object) {
    const data = Object.values(object);
    return data.some((item) => (!item.trim().length));
};

export function hasAllFields(object) {
  const expectedItems = ['userName', 'password', 'firstName', 'lastName'];
  const data = Object.keys(object);
  const allExpectedPresent = expectedItems.every(item => data.includes(item));
  const noExtraKeys = data.every(item => expectedItems.includes(item));
  return allExpectedPresent && noExtraKeys;
};

export function hasStringValue(object) {
  const data = Object.values(object);
  return data.some((item) => (typeof item === 'string'));
};
export function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}