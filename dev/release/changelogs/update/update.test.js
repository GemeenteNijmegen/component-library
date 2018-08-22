/* eslint-env jest */

const { updateChangelog } = require('./update');
const path = require('path');

describe('updating the changelog', () => {
    const changelogPath = path.join(__dirname, 'mocks/Changelog.md');
    const changeDirectory = path.join(__dirname, 'mocks/unreleased');

    it('should create an old version at the bottom', async (done) => {
        const { result001 } = require('./mocks/results/result001');
        await updateChangelog(changelogPath, changeDirectory, '0.0.1', false, result => {
            expect(result).toEqual(result001);
            done();
        });
    });

    it('should update an existing version', async (done) => {
        const { result100 } = require('./mocks/results/result100');
        await updateChangelog(changelogPath, changeDirectory, '1.0.0', false, result => {
            expect(result).toEqual(result100);
            done();
        });
    });

    it('should create a new version at the top', async (done) => {
        const { result201 } = require('./mocks/results/result201');
        await updateChangelog(changelogPath, changeDirectory, '2.0.1', false, result => {
            expect(result).toEqual(result201);
            done();
        });
    });

    it('should not change the file when nothing has changed', async (done) => {
        const { resultNoChange } = require('./mocks/results/resultNoChange');
        const emptyDirectory = path.join(__dirname, 'mocks/emptyDir');
        await updateChangelog(changelogPath, emptyDirectory, '2.0.1', false, result => {
            expect(result).toEqual(resultNoChange);
            done();
        });
    });

    it('should update the file when there are no previous entries', async (done) => {
        const { resultEmptyLog } = require('./mocks/results/resultEmptyLog');
        const emptyChangeLogPath = path.join(__dirname, 'mocks/EmptyChangelog.md');
        await updateChangelog(emptyChangeLogPath, changeDirectory, '2.0.1', false, result => {
            expect(result).toEqual(resultEmptyLog);
            done();
        });
    });

    it('should not change an empty file when nothing has changed', async (done) => {
        const { resultNoChangeEmptyLog } = require('./mocks/results/resultNoChangeEmptyLog');
        const emptyChangeLogPath = path.join(__dirname, 'mocks/EmptyChangelog.md');
        const emptyDirectory = path.join(__dirname, 'mocks/emptyDir');
        await updateChangelog(emptyChangeLogPath, emptyDirectory, '2.0.1', false, result => {
            expect(result).toEqual(resultNoChangeEmptyLog);
            done();
        });
    });
});
