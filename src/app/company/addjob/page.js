"use client";

import { useFormik } from "formik";
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'js-base64';
import { useSearchParams } from "next/navigation";

const AddJob = () => {

  const params = useSearchParams();
  const account = params.get("account");
  const decodeEmail = decode(account);
    
  const formik = useFormik({
    initialValues: {
      jobId:uuidv4(),
      company_name: "",
      job_title: "",
      job_location: "",
      job_link: "",
      office_type: "",
      company_logo_link: "",
      job_description: "",
      skills_required: "",
      benifits: [],
      salary_start: 0,
      salary_end: 0,
      year_of_experience: 0,
      job_vacancy: 1,
      accountEmail:decodeEmail
    },
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      const res = await fetch("/api/job", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      });

      console.log(res);
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <>
      <div className="m-6 flex justify-center">
        <form
          method="POST"
          onSubmit={formik.handleSubmit}
          className="p-4"
        >
          <div className="flex flex-col">
            <label htmlFor="company_name"><strong>Company Name*</strong></label>
            <input
              id="company_name"
              className="border px-3 py-1"
              {...formik.getFieldProps("company_name")}
              type="text"
              name="company_name"
              placeholder="Company Name"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="job_title"><strong>Job Title*</strong></label>
            <input
              id="job_title"
              className="border px-3 py-1"
              {...formik.getFieldProps("job_title")}
              type="text"
              name="job_title"
              placeholder="Job Title"
              required
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="job_location"><strong>Job Location*</strong></label>
            <input
              id="job_location"
              className="border px-3 py-1"
              {...formik.getFieldProps("job_location")}
              type="text"
              name="job_location"
              placeholder="Job Location"
              required
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="job_link"><strong>Job Link</strong></label>
            <input
              id="job_link"
              className="border px-3 py-1"
              {...formik.getFieldProps("job_link")}
              type="text"
              name="job_link"
              placeholder="Job Link"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="office_type"><strong>Office Type*</strong></label>
            <div className="flex flex-row justify-center border gap-x-2">
              <input
                id="hybrid_type"
                className="border px-3 py-1"
                {...formik.getFieldProps("office_type")}
                type="radio"
                value="Hybrid"
                name="office_type"
                required
              />
              <label htmlFor="hybrid_type">Hybrid</label>

              <input
                id="wfh"
                className="border px-3 py-1"
                {...formik.getFieldProps("office_type")}
                type="radio"
                name="office_type"
                value="Work From Home"
                required
              />
              <label htmlFor="wfh">Work From Home</label>

              <input
                id="in-office"
                className="border px-3 py-1"
                {...formik.getFieldProps("office_type")}
                type="radio"
                name="office_type"
                value="In-Office"
                required
              />
              <label htmlFor="in-office">In-Office</label>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="company_logo_link"><strong>Company Logo Link</strong></label>
            <input
              id="company_logo_link"
              className="border px-3 py-1"
              {...formik.getFieldProps("company_logo_link")}
              type="text"
              name="company_logo_link"
              placeholder="Company Logo Link"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="salary_start"><strong>Salary From*</strong></label>
            <input
              id="salary_start"
              className="border px-3 py-1"
              {...formik.getFieldProps("salary_start")}
              type="number"
              name="salary_start"
              placeholder="Salary From"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="salary_end"><strong>Salary To*</strong></label>
            <input
              id="salary_end"
              className="border px-3 py-1"
              {...formik.getFieldProps("salary_end")}
              type="number"
              name="salary_end"
              placeholder="Salary To"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="year_of_experience"><strong>Years of Experience*</strong></label>
            <input
              id="year_of_experience"
              className="border px-3 py-1"
              {...formik.getFieldProps("year_of_experience")}
              type="number"
              name="year_of_experience"
              placeholder="Years of Experience"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="job_vacancy"><strong>Job Openings</strong></label>
            <input
              id="job_vacancy"
              className="border px-3 py-1"
              {...formik.getFieldProps("job_vacancy")}
              type="number"
              name="job_vacancy"
              placeholder="Job Openings"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="job_description"><strong>Job Description*</strong></label>
            <textarea
              id="job_description"
              className="border px-3 py-1"
              {...formik.getFieldProps("job_description")}
              type="text"
              rows={3}
              name="job_description"
              placeholder="Job Description"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="skills_required"><strong>Skill Required*</strong></label>
            <div className="flex flex-col">
              <div className="">
                <input
                  id="fed"
                  className="border px-3 py-1"
                  {...formik.getFieldProps("skills_required")}
                  type="radio"
                  name="skills_required"
                  value="Front End Development"
                  required
                />
                <label htmlFor="fed">Front End Development (HTML, CSS, JS, React, MERN, Angular, MEAN etc.)</label>
              </div>
              <div className="">
                <input
                  id="bed"
                  className="border px-3 py-1"
                  {...formik.getFieldProps("skills_required")}
                  type="radio"
                  name="skills_required"
                  value="Back End Development"
                  required
                />
                <label htmlFor="bed">Back End Development (C, C++, Java, Python, Go, DevOps, etc.)</label>
              </div>
              <div className="">
                <input
                  id="fsd"
                  className="border px-3 py-1"
                  {...formik.getFieldProps("skills_required")}
                  type="radio"
                  name="skills_required"
                  value="Full Stack Development"
                  required
                />
                <label htmlFor="fsd">Full Stack Development</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="benifits"><strong>Benifits</strong></label>
            <div className="">
            <input
              id="benifits1"
              className="border px-3 py-1"
              {...formik.getFieldProps("benifits")}
              type="checkbox"
              name="benifits"
              placeholder="Job Openings"
              value="5 days a week"
            />
            <label htmlFor="benifits1">5 days a week</label>
            </div>
            <div className="">
            <input
              id="benifits2"
              className="border px-3 py-1"
              {...formik.getFieldProps("benifits")}
              type="checkbox"
              name="benifits"
              placeholder="Job Openings"
              value="Informal Dress Code"
            />
            <label htmlFor="benifits2">Informal Dress Code</label>
            </div>
            <div className="">
            <input
              id="benifits3"
              className="border px-3 py-1"
              {...formik.getFieldProps("benifits")}
              type="checkbox"
              name="benifits"
              placeholder="Job Openings"
              value="Free Snacks and beverages"
            />
            <label htmlFor="benifits3">Free Snacks and beverages</label>
            </div>
            <div className="">
            <input
              id="benifits4"
              className="border px-3 py-1"
              {...formik.getFieldProps("benifits")}
              type="checkbox"
              name="benifits"
              placeholder="Job Openings"
              value="Health Insurance"
            />
            <label htmlFor="benifits4">Health Insurance</label>
            </div>
            <div className="">
            <input
              id="benifits5"
              className="border px-3 py-1"
              {...formik.getFieldProps("benifits")}
              type="checkbox"
              name="benifits"
              placeholder="Job Openings"
              value="Life Insurance"
            />
            <label htmlFor="benifits5">Life Insurance</label>
            </div>
          </div>

          <button type="submit" className="border px-4 py-1 bg-slate-100 mt-4">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddJob;
