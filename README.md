
# auto-mark-processing-in-python-in-edX

uses the skulpt "python in processing IDE" within edXs advanced javascript problem

## dependencies

jquery.min.js

codemirrorepl.js

processing-1.4.1.min.js

skulpt:

-python.js

-skulpt.min.js

-skulpt-stdlib.js



## edX problem template:

Note: automarking algorith is in the javascript file and returns "correct", alternatively you can return other values and implement automarking in python within the check_function(e,ans):

```
<problem>
    <customresponse cfn="check_function">
        <script type="loncapa/python">
<![CDATA[
import json
def check_function(e, ans):
    """
    "response" is a dictionary that contains two keys, "answer" and
    ""state".

    The value of "answer" is the JSON string that "getGrade" returns.
    The value of "state" is the JSON string that "getState" returns.
    Clicking either "Submit" or "Save" registers the current state.

    response = json.loads(ans)

    # You can use the value of the answer key to grade:
    answer = json.loads(response["answer"])
    return answer == "correct"

    # Or you can use the value of the state key to grade:
    """
    response = json.loads(ans)
    state = json.loads(response["state"])
    return state["selectedChoice"] == "correct"
    """
    return True
    """
]]>
        </script>
        <jsinput
            gradefn="JSInputDemo.getGrade"
            get_statefn="JSInputDemo.getState"
            set_statefn="JSInputDemo.setState"
            initial_state='{"default":"def setup():\n\tbackground(0)\n\ttext(\"hello world\",20,50)\n","selectedChoice":"incorrect1"}'
            width="600"
            height="480"
            html_file="https://test.madmaker.com.au/processingjs/autoMark.html"
            title="Dropdown with Dynamic Text"
            sop="false"/>
    </customresponse>
</problem>
```
