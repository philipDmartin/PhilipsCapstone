// import React, { useContext, useRef, useEffect } from 'react'
// import { ReviewContext } from '../providers/ReviewProvider'
// import { useHistory } from 'react-router-dom'
// import { CategoryContext } from "../providers/CategoryProvider";

// export default props => {
//   const { addReview, reviews } = useContext(ReviewContext)
//   const { categories, getAllCategories } = useContext(CategoryContext);

//   const title = useRef('title')
//   const content = useRef('content')
//   const category = useRef('category')
//   const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
//   const imageLocation = useRef('imageLocation')
//   const publishDateTime = useRef('publishDateTime')
//   const history = useHistory()

//   const constructNewReview = () => {

//     const newReviewObject = {
//       title: title.current.value,
//       content: content.current.value,
//       createDateTime: new Date(),
//       categoryId: parseInt(category.current.value),
//       userProfileId: userProfile.id,
//       imageLocation: imageLocation.current.value,
//       publishDateTime: publishDateTime.current.value,
//     }
//     if (publishDateTime.current.value === "") {
//       newReviewObject.publishDateTime = null;
//     }

//     console.log(newReviewObject)
//     return addReview(newReviewObject).then(props)
//   }


//   useEffect(() => {
//     getAllCategories();
//   }, []);

//   return (
//     <div className="newReviewForm">
//       <form className='reviewFormCard'>
//         <h2 className='reviewForm__title'>New Review</h2>
//         <fieldset>
//           <div className='form-group'>
//             <label htmlFor='reviewTitle'>Review title: </label>
//             <input
//               type='text'
//               id='reviewTitle'
//               ref={title}
//               required
//               autoFocus
//               className='form-control'
//               placeholder='Review title'
//             />
//           </div>
//         </fieldset>

//         <fieldset>
//           <div className='form-group'>
//             <label htmlFor='reviewContent'>Review content: </label>
//             <input
//               type='textarea'
//               id='reviewContent'
//               ref={content}
//               required
//               autoFocus
//               className='form-control'
//               placeholder='Review content'
//             />
//           </div>
//         </fieldset>

//         <fieldset>
//           <div className='form-group'>
//             <label htmlFor='reviewCategory'>Category: </label>
//             <select
//               defaultValue=''
//               name='category'
//               ref={category}
//               id='category'
//               className='form-control'
//               placeholder='category'
//               required
//               autoFocus
//             >
//               <option value='0'>Select a category</option>
//               {categories.map(c => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </fieldset>

//         <fieldset>
//           <div className='form-group'>
//             <label htmlFor='reviewImageLocation'>Review Image URL: </label>
//             <input
//               type='text'
//               id='reviewImageLocation'
//               ref={imageLocation}
//               autoFocus
//               className='form-control'
//               placeholder='Review imageLocation'
//             />
//           </div>
//         </fieldset>

//         <fieldset>
//           <div className='form-group'>
//             <label htmlFor='reviewPublishDateTime'>Review Publish Date Time: </label>
//             <input
//               type='date'
//               id='reviewPublishDateTime'
//               ref={publishDateTime}
//               autoFocus
//               className='form-control'
//               placeholder='Review publishDateTime'
//             />
//           </div>
//         </fieldset>

//         <button
//           type='submit'
//           onClick={evt => {
//             evt.preventDefault() // Prevent browser from submitting the form
//             constructNewReview().then(p => history.push('/userreviews'))

//           }}
//           className='btn btn-primary'
//         >
//           Save Review
//       </button>
//       </form>
//     </div>
//   )
// }