export const template = ({ fullname, email, api, reason, description }) => {
  return `
<div style="display:block;font-size:12px;margin-bottom:10px;">
  <h4 style="display:block;margin-bottom:5px;font-weight:bold;font-size:14px;">Name</h4>
  <p style="font-size:12px;>${fullname}</p>
</div>
<div style="display:block;font-size:12px;margin-bottom:10px;">
  <h4 style="display:block;margin-bottom:5px;font-weight:bold;font-size:14px;">Email</h4>
  <p style="font-size:12px;>${email}</p>
</div>
<div style="display:block;font-size:12px;margin-bottom:10px;">
  <h4 style="display:block;margin-bottom:5px;font-weight:bold;font-size:14px;">Reason</h4>
  <p style="font-size:12px;>${reason}</p>
</div>
${api !== undefined && `
<div style="display:block;font-size:12px;margin-bottom:10px;">
  <h4 style="display:block;margin-bottom:5px;font-weight:bold;font-size:14px;">API</h4>
  <p style="font-size:12px;>${api}</p>
</div>
`}
<div style="display:block;font-size:12px;margin-bottom:10px;">
  <h4 style="display:block;margin-bottom:5px;font-weight:bold;font-size:14px;">Description</h4>
  <p style="font-size:12px;>${description}</p>
</div>`
}
