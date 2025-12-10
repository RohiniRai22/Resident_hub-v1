// ratings: [
//     {
//       userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//       rating: {
//         type: Number,
//         min: 1,
//         max: 5,
//         required: true,
//       },
//       review: {
//         type: String,
//         trim: true,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],