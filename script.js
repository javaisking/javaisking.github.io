async function refresh(){
  try {
      let amount = 0;
      const supabaseUrl = 'https://dbqbjyizonssvnigfaum.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicWJqeWl6b25zc3ZuaWdmYXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxODgyMTgsImV4cCI6MjAyMDc2NDIxOH0.qdCwDF6CQS_qOfNpT6nE_4xVvdu1SJ71njTEgnl1ygk';
      const data = document.getElementById('data').value;


      const colorizeText = (text) => {
        // Replace newlines with <br> tags
        text = text.replace(/\n/g, '<br>');
  
        // Split text into segments
        const segments = text.split(/(\[\d+:\d+:\d+\]|\[Server thread\/INFO\]|\([^)]+\)|"[^"]+")/);
  
        // Define color mappings
        const colorMap = {
          '\\[\\d+:\\d+:\\d+\\]': '#3592B7',
          '\\[Server thread\\/INFO\\]': '#5B842A',
          '\\([^)]+\\)': '#1B7396',
          '"[^"]+"': '#B9B7B6',
        };
  
        // Apply colors based on patterns
        const coloredSegments = segments.map((segment) => {
          for (const pattern in colorMap) {
            const regex = new RegExp(pattern, 'g');
            if (regex.test(segment)) {
              return `<span style="color: ${colorMap[pattern]}">${segment}</span>`;
            }
          }
          return segment;
        });
  
        // Join colored segments
        return coloredSegments.join('');
      };
    
      const decodeUrlEncodedData = (encodedData) => {
          return decodeURIComponent(encodedData.replace(/\+/g, ' '));
      };

      // Send data to Supabase
      const postDataResponse = await fetch(`${supabaseUrl}/rest/v1/data`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
          },
          body: JSON.stringify({ data }),
      });

      // Check if data sent successfully
      if (!postDataResponse.ok) {
          throw new Error('Failed to send data to Supabase');
      }

      // Wait for 0.2 seconds
      await new Promise(resolve => setTimeout(resolve, 550));

      // Retrieve and process data from Supabase
      const response = await fetch(`${supabaseUrl}/rest/v1/console`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
          },
      });

      const dete = await response.json();

      // Process the retrieved data (you may need to implement this part)
      if (dete.length > amount) {
          const decodedData = decodeUrlEncodedData(dete[dete.length - 1].data);
          const colorizedData = colorizeText(decodedData);
          document.getElementById('console').innerHTML = colorizedData;
          document.getElementById('console').scrollTop = document.getElementById('console').scrollHeight;
      }
      amount = dete.length;

  } catch (error) {
      console.error('Error:', error.message);
  } finally {
      // Clear input field after processing
      document.getElementById('data').value = '';
  }
}



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('dataForm').addEventListener('keydown', async function (event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            const supabaseUrl = 'https://dbqbjyizonssvnigfaum.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicWJqeWl6b25zc3ZuaWdmYXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxODgyMTgsImV4cCI6MjAyMDc2NDIxOH0.qdCwDF6CQS_qOfNpT6nE_4xVvdu1SJ71njTEgnl1ygk'; // Replace with your Supabase API key
            let amount = 0;

            const decodeUrlEncodedData = (encodedData) => {
                return decodeURIComponent(encodedData.replace(/\+/g, ' '));
            };

          const colorizeText = (text) => {
            // Replace newlines with <br> tags
            text = text.replace(/\n/g, '<br>');

            // Split text into segments
            const segments = text.split(/(\[\d+:\d+:\d+\]|\[Server thread\/INFO\]|\([^)]+\)|"[^"]+")/);

            // Define color mappings
            const colorMap = {
              '\\[\\d+:\\d+:\\d+\\]': '#3592B7',
              '\\[Server thread\\/INFO\\]': '#5B842A',
              '\\([^)]+\\)': '#1B7396',
              '"[^"]+"': '#B9B7B6',
            };

            // Apply colors based on patterns
            const coloredSegments = segments.map((segment) => {
              for (const pattern in colorMap) {
                const regex = new RegExp(pattern, 'g');
                if (regex.test(segment)) {
                  return `<span style="color: ${colorMap[pattern]}">${segment}</span>`;
                }
              }
              return segment;
            });

            // Join colored segments
            return coloredSegments.join('');
          };

            try {
                const data = document.getElementById('data').value;

                // Send data to Supabase
                const postDataResponse = await fetch(`${supabaseUrl}/rest/v1/data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': supabaseKey,
                    },
                    body: JSON.stringify({ data }),
                });

                // Check if data sent successfully
                if (!postDataResponse.ok) {
                    throw new Error('Failed to send data to Supabase');
                }

                // Wait for 0.2 seconds
                await new Promise(resolve => setTimeout(resolve, 550));

                // Retrieve and process data from Supabase
                const response = await fetch(`${supabaseUrl}/rest/v1/console`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': supabaseKey,
                    },
                });

                const dete = await response.json();

                // Process the retrieved data (you may need to implement this part)
                if (dete.length > amount) {
                    const decodedData = decodeUrlEncodedData(dete[dete.length - 1].data);
                    const colorizedData = colorizeText(decodedData);
                    document.getElementById('console').innerHTML = colorizedData;
                    document.getElementById('console').scrollTop = document.getElementById('console').scrollHeight;
                }
                amount = dete.length;

            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                // Clear input field after processing
                document.getElementById('data').value = '';
            }
        }
    });
});
