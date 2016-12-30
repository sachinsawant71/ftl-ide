import { FileStructureTypes } from '../Constants';

const TestFileStructure = [
    {
        type: FileStructureTypes.FOLDER,
        label: 'com',
        children: [
            {
                type: FileStructureTypes.FOLDER,
                label: 'zhiquanyeo',
                children: [
                    {
                        type: FileStructureTypes.FOLDER,
                        label: 'robot',
                        children: [
                            {
                                type: FileStructureTypes.ITEM,
                                label: 'TestRobot.java'
                            },
                            {
                                type: FileStructureTypes.ITEM,
                                label: 'SomeOtherFile.java'
                            }
                        ]
                    },
                    {
                        type: FileStructureTypes.FOLDER,
                        label: 'utils',
                        children: [
                            {
                                type: FileStructureTypes.ITEM,
                                label: 'SomeUtil.java'
                            },
                            {
                                type: FileStructureTypes.ITEM,
                                label: 'SomeOtherUtil.java'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: FileStructureTypes.FOLDER,
        label: 'edu',
        children: [
            {
                type: FileStructureTypes.FOLDER,
                label: 'wpilibj',
                children: [
                    {
                        type: FileStructureTypes.ITEM,
                        label: 'RobotBase.java'
                    },
                    {
                        type: FileStructureTypes.ITEM,
                        label: 'Timer.java'
                    }
                ]
            }
        ]
    }
];

export { TestFileStructure };

export default {
    TestFileStructure: TestFileStructure
};