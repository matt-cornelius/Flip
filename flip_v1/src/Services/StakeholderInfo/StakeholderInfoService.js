import Parse from 'parse';

export const createStakeholderInfo = async (user, initialWager) => {
  const StakeholderInfo = Parse.Object.extend('StakeholderInfo');
  const stakeholderInfo = new StakeholderInfo();

  stakeholderInfo.set('FirstBetter', user);
  stakeholderInfo.set('FirstWager', initialWager);

  try {
    const result = await stakeholderInfo.save();
    console.log('StakeholderInfo created:', result);
    return result;
  } catch (error) {
    console.error('Error while creating StakeholderInfo:', error);
    throw error;
  }
};
