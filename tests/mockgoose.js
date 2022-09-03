import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);
// To download asset for the first time (subsequent runs don't need to download anymore)
await mockgoose.prepareStorage();
